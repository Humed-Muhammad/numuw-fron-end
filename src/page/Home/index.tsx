import { Container } from "@/components/core/Container";
import { useGetUsersQuery } from "./service";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IconFileImport, IconMessage, IconSend } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export const Home = () => {
  const { data, isLoading } = useGetUsersQuery("parent");
  return (
    <Container className="h-screen">
      <div className="bg-gray-100 w-96 p-3 h-full flex  flex-col">
        <Label className="my-3 text-lg">List of Parents</Label>
        {data?.data.map((user) => (
          <Card
            key={user.userId}
            className="p-3 px-4 justify-between flex space-y-3 cursor-pointer"
          >
            <div className="space-y-3 flex flex-col">
              <Label>Name</Label>
              <Label className="text-gray-400">{user.username}</Label>
            </div>
            <div className="space-y-3 flex flex-col">
              <IconMessage />
            </div>
          </Card>
        ))}
      </div>
      <div className="flex-grow mb-5 flex flex-col justify-between items-center h-full">
        <Container>Messages</Container>
        <div className="relative w-9/12">
          <input
            className="outline-none p-5 h-20 w-full border-2 border-green-500 rounded-md"
            placeholder="Message..."
          />
          <div className="absolute flex justify-center top-1/2 -translate-y-1/2 right-4 space-x-4">
            <Button variant="outline" size="icon">
              <IconSend />
            </Button>
            <Button variant="outline" size="icon">
              <IconFileImport />
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
