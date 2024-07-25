import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export  class usersRepository {
    private users = [
        {
          id: 1,
          name: 'Alice Smith',
          email: 'alice.smith@example.com'
        },
        {
          id: 2,
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com'
        },
        {
          id: 3,
          name: 'Charlie Brown',
          email: 'charlie.brown@example.com'
        },
        {
          id: 4,
          name: 'Diana Prince',
          email: 'diana.prince@example.com'
        },
        {
          id: 5,
          name: 'Eve Adams',
          email: 'eve.adams@example.com'
        }
      ];

      findAll(){
        return this.users;
      }
}

