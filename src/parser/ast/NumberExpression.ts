import Token from "../../lexer/token/Token";
import Expression from './Expression';

export default class NumberExpression extends Expression {
    private _number: Token;

    public constructor(number: Token) {
        super();
        this._number = number;
    }

    public get number(): Token {
        return this._number;
    }
}
