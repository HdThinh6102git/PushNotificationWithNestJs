import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'thinh@gmail.com'})
  email: string;
  //dd

  @Column({ default: 'thinh'})
  username: string;

  @Column({
    default: 'ACTIVE',
  })
  status: string;
}
