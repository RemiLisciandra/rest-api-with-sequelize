import {faker} from '@faker-js/faker';

const generateUser = (id) => {
    return {
        id: id,
        fullName: faker.name.fullName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        age: faker.datatype.number({min: 10, max: 100}),
        picture: faker.image.avatar(),
        cars: [faker.vehicle.vehicle(), faker.vehicle.vehicle()],
        createdAt: faker.date.between('2023-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
    };
};

const generateUsersList = (count) => {
    let usersList = [];
    for (let i = 1; i <= count; i++) {
        usersList.push(generateUser(i));
    }
    return usersList;
};

export {generateUsersList};