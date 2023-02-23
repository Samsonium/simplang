export default class TokenType {
    private _name: string;
    private _regex: string;

    public constructor(name: string, regex: string) {
        this._name = name;
        this._regex = regex;
    }

    public get name(): string {
        return this._name;
    }

    public get regex(): string {
        return this._regex;
    }
}

export const tokenTypeList = {
    'NUMBER':       new TokenType('NUMBER', '[0-9]*'),
    'VARIABLE':     new TokenType('VARIABLE', '[а-я_]*'),
    'SEMICOLON':    new TokenType('SEMICOLON', ';'),
    'SPACE':        new TokenType('SPACE', '[ \\n\\t\\r]'),
    'ASSIGN':       new TokenType('ASSIGN', '='),
    'LOG':          new TokenType('LOG', 'ЛОГ'),
    'PLUS':         new TokenType('PLUS', '\\+'),
    'MINUS':        new TokenType('MINUS', '\\-'),
    'LPAR':         new TokenType('LPAR', '\\('),
    'RPAR':         new TokenType('RPAR', '\\)'),
}
