```
Frontend (React)
       │
       ▼
Express API
       │
       ▼
Prisma Client
       │
       ▼
PostgreSQL Database
```

Prisma acts as an ORM (Object Relational Mapper).

Instead of writing SQL like:

```sql
SELECT * FROM users;
```

you write:
```ts
await prisma.user.findMany();
```