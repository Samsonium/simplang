import TokenType from "./TokenType";

export default class Token {
    private _type: TokenType;
    private _text: string;
    private _pos: number;

    public constructor(type: TokenType, text: string, pos: number) {
        this._type = type;
        this._text = text;
        this._pos = pos;
    }

    public get type(): TokenType {
        return this._type;
    }

    public get text(): string {
        return this._text;
    }

    public get pos(): number {
        return this._pos;
    }
}