import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Favorite {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    owner!: string;

    @Column()
    gist!: string;

}