import { db } from '@vercel/postgres';

const client = await db.connect();

async function listInvoices() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

     const res = client.sql`
        SELECT invoices.amount, customers.name
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        WHERE invoices.amount = 666;
      `;

      return res;
}

export async function GET() {
  try {
    const res = await listInvoices();
    return Response.json(res.rows);
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
