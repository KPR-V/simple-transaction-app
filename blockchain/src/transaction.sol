//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {PriceConverter} from "./priceconverter.sol";

contract simpletransaction {
    using PriceConverter for uint256;

    AggregatorV3Interface private pricefeed;

    constructor(address _pricefeed) {
        pricefeed = AggregatorV3Interface(_pricefeed);
    }

    function converttousd(uint256 ethAmount) public view returns (uint256) {
        return ethAmount.getConversionRate(pricefeed);
    }

    function transaction(address reciever) external payable {
        require(msg.value > 0, "value should be greater than 0");
        (bool success,) = payable(reciever).call{value: msg.value}("");
        require(success, "transaction failed");
    }
}
