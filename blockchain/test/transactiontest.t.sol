//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {simpletransaction} from "../src/transaction.sol";
import {deploytransaction} from "../script/deploytransaction.s.sol";

contract transactiontest is Test {
    simpletransaction st;
    address user = makeAddr("user");

    function setUp() public {
        deploytransaction dt = new deploytransaction();
        st = dt.run();
        vm.deal(user, 100e18);
    }

    function testTransactionnovaluegiven() public {
        vm.expectRevert();
        st.transaction(user);
    }

    function testtransactionwhenvaluegiven() public {
        vm.prank(user);
        address reciever = makeAddr("reciever");
        vm.deal(reciever, 0);
        st.transaction{value: 50e18}(reciever);
        assertEq(reciever.balance, 50e18);
    }

    function testconverttousd() public view {
        uint256 ethAmount = 1e18;
        uint256 usdAmount = st.converttousd(ethAmount);
        usdAmount = usdAmount / 1e18;
        console.log("usdAmount", usdAmount);
    }
}
