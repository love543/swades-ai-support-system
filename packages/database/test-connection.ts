import postgres from 'postgres';

const connectionString = 'postgresql://postgres:Love@123@localhost:5432/swades_support';

async function testConnection() {
    try {
        console.log('Testing connection to:', connectionString.replace(/:[^:@]+@/, ':****@'));
        const sql = postgres(connectionString);

        const result = await sql`SELECT current_database(), current_user, version()`;
        console.log('✅ Connection successful!');
        console.log('Database:', result[0].current_database);
        console.log('User:', result[0].current_user);
        console.log('Version:', result[0].version);

        await sql.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed!');
        if (error instanceof Error) {
            console.error('Error:', error.message);
            // PostgreSQL errors have a 'code' property
            if ('code' in error) {
                console.error('Code:', (error as any).code);
            }
        } else {
            console.error('Error:', error);
        }
        console.error('');
        console.error('Possible issues:');
        console.error('1. Wrong password - check if postgres password is "Love@123"');
        console.error('2. Database "swades_support" doesn\'t exist - run: createdb swades_support');
        console.error('3. PostgreSQL not accepting connections - check pg_hba.conf');
        process.exit(1);
    }
}

testConnection();
