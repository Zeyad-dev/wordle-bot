import { User } from 'discord.js'
interface Data {
    location: string,
    tasks: string[]
}
export abstract class player {
    constructor(public user: User, public type: string) {}
}
export class CrewMate extends player {
    constructor(public user: User) {
        super(user, 'Crew mate')
    }
    public locationsObject : Data[] = [
        {
            location: 'Admin',
            tasks: [
                'Swipe Card'
            ]
        },
        {
            location: 'Cafeteria',
            tasks: [
                'Upload Data', 
                'Empty garbage'
            ]
        },
        {
            location: 'Communications',
            tasks: [
                'Upload data',
                'Divert power to communications'
            ]
        },
        {
            location: 'Electrical',
            tasks: [
                'Upload data', 
                'Fix wiring', 
                'Calibrate distributor'
            ]
        },
        {
            location: 'Engines',
            tasks: [
                'Align engine output',
                'Divert power to Upper engine',
                'Divert power to lower engine'
            ]
        },
        {
            location: 'MedBay',
            tasks: [
                'Submit Scan',
                'Inspect sample'
            ]
        },
        {
            location: 'Navigation',
            tasks: [
                'Chart course',
                'Upload data', 
                'Divert power to Navigation', 
                'Stabilize steering'
            ]
        },
        {
            location: 'O2',
            tasks: [
                'Empty chute', 
                'Divert power to O2', 
                'Clean O2 filter'
            ]
        },
        {
            location: 'Reactor',
            tasks: [
                'Start reactor', 
                'Unlock manifolds'
            ]
        },
        {
            location: 'Shields',
            tasks: [
                'Prime Shields',
                'Divert power to shields'
            ]
        },
        {
            location: 'Weapons',
            tasks: [
                'Clear Asteroids', 
                'Upload data', 
                'Divert Power to Weapons'
            ]
        },
    ]
}
export class Imposter extends player {
    constructor(public user : User) {
        super(user, 'Imposter')
    }
}