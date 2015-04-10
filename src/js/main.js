/**
 * Created by oliwang on 4/6/15.
 */
define(function (require) {
    'use strict';
    var ns = {};
    var $ = require('jquery');
    var board = require('../../src/js/templates/board.tmpl');
    ns.init = function (){
        $('body').append($(board()));
        ns.setMatrix();
        console.log(ns.board);
        ns.bindEvent();
    };
    ns.setMatrix= function(){
        ns.board= new Array(9);
        for(var i=0;i<9;i++){
            ns.board[i]=new Array(9);
        }
        var grids= $('.grid');
        for(var i=0;i<grids.length;i++){
            var grid=grids.eq(i);
            var row=grid.attr('data-row');
            var col=grid.attr('data-col');
            ns.board[row][col]=parseInt(grid.text()) || 0;
        }
    };
    ns.bindEvent= function (){
        var self=this;
        $('.step').keydown(function (e){
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                    // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                    // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            var charValue = String.fromCharCode(e.keyCode), valid = /^[1-9]+$/.test(charValue);

            if (!valid) {
                e.preventDefault();
            }

        });
        $('.step').keyup(function (e){
            if(ns.timeid) {
               clearTimeout(ns.timeid);
            }
            var $target=$(e.target);
            var val = parseInt($target.val().trim());

            var row=parseInt($target.parent().attr('data-row'));
            var col=parseInt($target.parent().attr('data-col'));
            if(ns.isValidNumber(val)) {
                self.validSudoku(row, col, val, $target);
            }else{
                alert('please input number 1-9');
            }
            ns.timeid = setTimeout(function () {
                ns.verifySolution();
            }, 6000);
        });
    };
    ns.verifySolution = function (){
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                if(!ns.validSudoku(i,j, ns.board[i][j])) return false;
            }
        }
        console.log('This is correct solution');
    };
    ns.validSudoku = function (row, col, val, $target){
        ns.board[row][col]=val;
        var hash=[];
        for(var i=0;i<9;i++){
            var curr= ns.board[row][i];
            if(curr!==0&&hash.indexOf(curr)!==-1) {
                ns.resetGrid(row, col, $target);
                console.log('this is not right solution');
                return false;
            }
            if(ns.isValidNumber(curr)){
                hash.push(curr);
            }
        }
        hash=[];
        for(var j=0;j<9;j++){
            var curr= ns.board[j][col];
            if(curr!==0&&hash.indexOf(curr)!==-1) {
                ns.resetGrid(row,col, $target);
                console.log('this is not right solution');
                return false;
            }
            if(ns.isValidNumber(curr)){
                hash.push(curr);
            }
        }
        hash=[];
        for(var i=0;i<3;i++) {
            for (var j = 0; j < 3; j++) {
                var curr = ns.board[~~(row / 3) * 3 + i][~~(col / 3) * 3 + j];
                if (curr !== 0 && hash.indexOf(curr) !== -1) {
                    ns.resetGrid(row, col, $target);
                    console.log('this is not right solution');
                    return false;
                }
                if (ns.isValidNumber(curr)) {
                    hash.push(curr);
                }
            }
        }
        return true;

    };
    ns.resetGrid=function (row, col, $target){
        ns.board[row][col]=0;
        $target.val('');
    };

    ns.isValidNumber = function (data){
        if(data>=1&&data<=9){
            return true;
        }
        return false;
    };


    return ns;
});
