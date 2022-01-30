interface IStar {
    _id: string
    priority: number;
    severity: number;
    name: string;
    status: string;
    assignee: string;
    version: string;
    publisher: string;
    event: string;
    resources: string[];
    desc: string;
    computer: string;
    createdAt?: string
    updatedAt?: string
}

interface StarProps {
    star: IStar
}

type ApiDataType = {
    message: string
    status: string
    stars: IStar[]
    star?: IStar
}
