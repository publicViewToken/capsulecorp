pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract capsulecorp is ERC721Full {
  string[] private messages;
  uint256 private createTime;
     uint256 public deadline;
   // uint public totalSupply;
   MSG[] private msgs; // where all messages go
   uint[] public ids;
  struct MSG{
      
       string text;
    //  uint mins;
     // uint key;
  }
  
  mapping(string => bool) _msgExists;

  constructor() ERC721Full("Capsulecorp", "CAPSULE") public {


  }
  
   function Time() public {

       createTime = block.timestamp;
         
    }

  function mint(string memory _msg, uint _mins) public {
   // require(!_msgExists[_msg]);
    uint id = msgs.length;

     deadline = block.timestamp + (_mins *  1 minutes);// get the time 
    ids.push(deadline);
    msgs.push(MSG(_msg)); 
    
    _mint(msg.sender, id);

    // totalSupply = id.length;
  //  _msgExists[_msg] = true;
  }
  
  function showMessage(uint _id)public view returns(string memory){
        //require(block.timestamp >= ids[_id]);
      
       MSG  storage usermsg = msgs[_id];
     //  if(usermsg.key == _k){
     //       return(usermsg.text); //add if need a key or use another function
     //  }
       //else if
       
     //  if(block.timestamp >= ids[_id])//require time stamp
        //  {
          
              return(usermsg.text);
      // }else {
      //     return("This message will be unlocked soon...");
      // }
   
  }

  function showTimedMessage(uint _id)public view returns(string memory){

  MSG  storage usermsg = msgs[_id];
   if(block.timestamp >= ids[_id])//require time stamp
     {
          
          return(usermsg.text);

       }else {
          return(" unlocking soon...");
       }

  }



}
