import { world, system, Player } from "@minecraft/server"
import * as ui from "@minecraft/server-ui"

export class Dialog {
    content = { title:"", content:"" }
    optiona: { text: string; to: Dialog | (() => void) }[];
    constructor() {
        this.content = {title:"", content:""}
        this.optiona = [];
    }

    title(title: string, content: string) {
        this.content = ({ 
            title: title,
            content: content 
        })
        return this
    }
    option(text: string, to:Dialog|(() => void)){
        this.optiona.push({ text: text, to: to })
        return this
    }

    show(who: Player){
        
    }
}