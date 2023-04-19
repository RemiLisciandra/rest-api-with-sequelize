import {faker} from '@faker-js/faker';

const generateUser = () => {
    return {
        fullName: faker.name.fullName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        age: faker.datatype.number({min: 10, max: 100}),
        picture: faker.image.avatar(),
        cars: [faker.vehicle.vehicle(), faker.vehicle.vehicle()]
    };
};

const generateUsersList = (count) => {
    let usersList = [];
    for (let i = 1; i <= 10; i++) {
        usersList.push(generateUser());
    }
    return usersList;
};

export {generateUsersList};