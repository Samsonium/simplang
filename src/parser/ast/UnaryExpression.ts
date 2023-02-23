import Token from "../../lexer/token/Token";
import Expression from "./Expression";

export default class UnaryExpression extends Expression {
    private _operator: Token;
    private _operand: Expression;

    public constructor(operator: Token, operand: Expression) {
        super();
        this._operator = operator;
        this._operand = operand;
    }

    public get operator(): Token {
        return this._operator;
    }

    public get operand(): Expression {
        return this._operand;
    }
}
