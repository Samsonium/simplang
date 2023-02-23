import Token from "../../lexer/token/Token";
import Expression from "./Expression";

export default class BinaryExpression extends Expression {
    private _operator: Token;
    private _leftNode: Expression;
    private _rightNode: Expression;

    public constructor(operator: Token, left: Expression, right: Expression) {
        super();
        this._operator = operator;
        this._leftNode = left;
        this._rightNode = right;
    }

    public get operator(): Token {
        return this._operator;
    }
    
    public get leftNode(): Expression {
        return this._leftNode;
    }
    
    public get rightNode(): Expression {
        return this._rightNode;
    }
}