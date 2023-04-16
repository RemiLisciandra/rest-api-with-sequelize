import { faker } from '@faker-js/faker';

const generateUser = (id) => {
    return {
        id: id,
        name: faker.name.fullName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: faker.datatype.number({ min: 10, max: 100 }),
        picture: faker.image.avatar(),
        cars: [faker.vehicle.vehicle(), faker.vehicle.vehicle()],
        created: faker.date.between('2023-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
    };
};

const users = [];

for (let i = 1; i <= 1000; i++) {
    users.push(generateUser(i));
}

export default users;