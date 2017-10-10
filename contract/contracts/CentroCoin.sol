/**
 *  Centro Coin Contract
 */

pragma solidity ^0.4.15;


contract CentroCoin {

    string public constant name = "Centro";
    string public constant symbol = "CEN";
    uint256 public constant decimals = 8;

    uint256 public constant MAX_PURCHASE = 1000 ether;
    uint256 public constant MIN_PURCHASE = 0.1 ether;
    uint256 public constant PRICE_PER_TOKEN = 400000000; // 1e12 / 25000
    
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function CentroCoin() public {}

    function () payable public {
        require(msg.value >= MIN_PURCHASE && msg.value <= MAX_PURCHASE);
        uint256 tokensPurchased = msg.value / PRICE_PER_TOKEN;
        balances[msg.sender] += tokensPurchased;
		Transfer(msg.sender, msg.sender, tokensPurchased);
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        if (balances[msg.sender] >= _value) {
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        }
        return false;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value) {
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            balances[_to] += _value;
            Transfer(_from, _to, _value);
            return true;
        }
        return false;
    }

    function balanceOf(address _owner) constant public returns (uint256) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) constant public returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}
