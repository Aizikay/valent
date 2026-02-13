export interface User {
    username: string;
    password: string;
}

export interface Invite {
    id: string;
    creator: string;
    targetName: string;
    slug: string;
    slogan: string;
    explanation: string;
    answers: Answer[];
}

export interface Answer {
    name: string;
    answer: 'yes' | 'no';
    timestamp: number;
}

const STORAGE_KEY = 'valentine_db';

const getDb = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return { users: [], invites: [] };
    return JSON.parse(data);
};

const saveDb = (db: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const database = {
    createUser: (user: User) => {
        const db = getDb();
        if (db.users.find((u: User) => u.username === user.username)) {
            throw new Error('User already exists');
        }
        db.users.push(user);
        saveDb(db);
    },

    login: (user: User) => {
        const db = getDb();
        const found = db.users.find((u: User) => u.username === user.username && u.password === user.password);
        return !!found;
    },

    createInvite: (invite: Omit<Invite, 'id' | 'answers'>) => {
        const db = getDb();
        const newInvite: Invite = {
            ...invite,
            id: Math.random().toString(36).substring(2, 9),
            answers: []
        };
        db.invites.push(newInvite);
        saveDb(db);
        return newInvite;
    },

    getInvitesByUser: (username: string) => {
        const db = getDb();
        return db.invites.filter((i: Invite) => i.creator === username);
    },

    getInviteById: (id: string) => {
        const db = getDb();
        return db.invites.find((i: Invite) => i.id === id);
    },

    getInviteByPath: (username: string, slug: string) => {
        const db = getDb();
        return db.invites.find((i: Invite) =>
            i.creator.toLowerCase() === username.toLowerCase() &&
            i.slug.toLowerCase() === slug.toLowerCase()
        );
    },

    addAnswer: (inviteId: string, answer: Answer) => {
        const db = getDb();
        const invite = db.invites.find((i: Invite) => i.id === inviteId);
        if (invite) {
            invite.answers.push(answer);
            saveDb(db);
        }
    }
};
