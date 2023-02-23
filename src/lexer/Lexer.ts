import Token from "./token/Token";
import { tokenTypeList } from "./token/TokenType";

export default class Lexer {
    private code: string;
    private pos: number;
    private tokens: Token[] = [];

    public constructor(code: string) {
        this.code = code;
        this.pos = 0;
    }

    public analyze(): Token[] {
        while (this.nextToken()) {}

        return this.tokens = this.tokens.filter(t => t.type !== tokenTypeList.SPACE);
    }

    public nextToken(): boolean {
        if (this.pos >= this.code.length)
            return false;

        const tokenTypes = Object.values(tokenTypeList);
        for (let i = 0; i < tokenTypes.length; i++) {
            const type = tokenTypes[i];
            const regex = new RegExp('^' + type.regex);
            const result = this.code.substring(this.pos).match(regex);

            if (result && result[0]) {
                this.tokens.push(new Token(type, result[0], this.pos));
                this.pos += result[0].length;
                return true;
            }
        }
        
        throw new Error(`Ошибка на позиции ${this.pos}`);
    }
}
