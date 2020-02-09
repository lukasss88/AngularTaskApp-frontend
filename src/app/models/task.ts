export class Task {
    _id?: number
    title: string
    description: string
}

export class NewTask {
    constructor(
        public title: string,
        public description: string,
        public _id?: number,
    ){}
}

