//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {simpletransaction} from "../src/transaction.sol";

contract deploytransaction is Script {
    address sepoliaethtousdpricefeed =
        0x694AA1769357215DE4FAC081bf1f309aDC325306;

    function run() external returns (simpletransaction) {
        vm.startBroadcast();
        simpletransaction st = new simpletransaction(sepoliaethtousdpricefeed);
        vm.stopBroadcast();
        console.log("deployed simpletransaction at address: ", address(st));
        return st;
    }
}
