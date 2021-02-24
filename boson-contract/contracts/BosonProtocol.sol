// SPDX-License-Identifier: LGPL-3.0-or-later
pragma solidity 0.5.16;

contract BosonProtocol {

    event Paused(address account);


    event Unpaused(address account);

    address private _owner;
    bool private _paused;

    constructor () public {
        _owner = msg.sender;
        _paused = false;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function paused() public view returns (bool) {
        return _paused;
    }

    modifier onlyOwner() {
        require(owner() == msg.sender, "Caller is not the Owner");
        _;
    }

    modifier whenNotPaused() {
        require(!paused(), "Paused");
        _;
    }

    modifier whenPaused() {
        require(paused(), "Not Paused");
        _;
    }

    function pause() external whenNotPaused onlyOwner {
        _paused = true;
        emit Paused(msg.sender);
    }

    function unpause() external whenPaused onlyOwner {
        _paused = false;
        emit Unpaused(msg.sender);
    }
}
