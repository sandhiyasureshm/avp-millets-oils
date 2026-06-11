import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Inquiries</h1>
        <p className="text-gray-500 mt-2">View messages submitted through the contact form.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="max-w-[400px]">Message</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No inquiries found.
                  </TableCell>
                </TableRow>
              ) : (
                inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(inquiry.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="font-medium">{inquiry.name}</TableCell>
                    <TableCell>{inquiry.phone}</TableCell>
                    <TableCell className="max-w-[400px] truncate" title={inquiry.message}>
                      {inquiry.message}
                    </TableCell>
                    <TableCell>
                      <Badge variant={inquiry.status === 'NEW' ? 'default' : 'secondary'}>
                        {inquiry.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
