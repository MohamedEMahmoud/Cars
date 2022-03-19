import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

describe("AuthService", () => {

    const users: User[] = [];

    let fakeUsersService: Partial<UsersService> = {
        find: (email: string) => {
            const filteredUsers = users.filter(user => user.email === email);
            return Promise.resolve(filteredUsers);
        },
        create: (email: string, password: string) => {
            const user = {
                id: Math.floor(Math.random() * 9999),
                email,
                password
            } as User;
            users.push(user);
            return Promise.resolve(user);
        }
    };

    let service: AuthService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('creates a new user with a salted and hashed password', async () => {

        const user = await service.signup('test@test.com', 'test');

        expect(user.password).not.toEqual('test');

        const [salt, hash] = user.password.split('.');

        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that in use', async () => {
        try {
            await service.signup('test@test.com', 'test');
        } catch (err) {
            expect(err.status).toEqual(400);
        }

    });

    it('trows if signin is called with an unused email', async () => {
        try {
            await service.signin('test2000@test.com', 'test');
        } catch (err) {
            expect(err.status).toEqual(404);
        }
    });

    it('throws if an invalid password is provided', async () => {
        await service.signin('test@test.com', 'test');
        try {
            await service.signin('test@test.com', 'password');
        } catch (err) {
            expect(err.status).toEqual(400);
        }
    });

    it('returns a user if correct password is provided', async () => {
        await service.signup('test90@test.com', 'password');
        const user = await service.signin('test90@test.com', 'password');
        expect(user).toBeDefined();
    });
});

