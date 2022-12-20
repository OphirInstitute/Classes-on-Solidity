// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract OPHIRCLASSTEST {
    //uint videoswatched = 4;

    bool public canTakeTest = false;

    string public sign =
        "You are not eligible to take test Return to the Drive Folder";

    function watchedVideos(uint videoswatched) external {
        if (videoswatched >= 4) {
            canTakeTest = true;
            sign = "CONGRATULATIONS kindly proceed to take your first Test";
        } else {
            canTakeTest = false;
            sign = "OPHIR loves you return back to watch the videos";
        }
    }

    function getResult() public view returns (string memory) {
        return sign;
    }

    function getMinimum() public pure returns (uint) {
        uint minimumVideos = 4;
        return minimumVideos;
    }
}
