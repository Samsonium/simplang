import Token from "../../lexer/token/Token";
import Expression from "./Expression";

export default class VariableExpression extends Expression {
    private _variable: Token;

    public constructor(variable: Token) {
        super();
        this._variable = variable;
    }

    public get variable(): Token {
        return this._variable;
    }
}
