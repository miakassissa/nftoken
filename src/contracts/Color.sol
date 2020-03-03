// pragma solidity ^0.6.0; // Suitable Version for running in VS Code
pragma solidity ^0.5.0; // Suitable Version for running in the CMD

// import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
// Normally we should use the line above but since for this "test project",
// We want the code to always be exact (not affected if OpenZeppelin changes for example, the name
// ERC721Full.sol to another one) we the use the line below after applying the command
// truffle-flattener to "@openzeppelin/contracts/token/ERC721/ERC721Full.sol" file
import "./ERC721Full.sol";

contract Color is ERC721Full {
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() ERC721Full("Color", "COLOR") public {}

    function mint(string memory _color) public {
        // Nécessite une couleur UNIQUE
        require(!_colorExists[_color]);
        uint _id = colors.push(_color);
        _mint(msg.sender, _id);
        _colorExists[_color] = true;
        
        // Couleur - ajout
    }

}