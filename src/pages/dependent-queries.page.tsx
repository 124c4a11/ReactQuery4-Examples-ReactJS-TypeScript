import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IUser } from "../types/IUser";
import { IChannel } from "../types/IChannel";

interface DependentQueriesPageProps {
  email: string;
}

const fetchUserByEmail = (email: string) =>
  axios.get<IUser>(`http://localhost:4000/users/${email}`);

const fetchCoursesByChannelId = (channelId: string) =>
  axios.get<IChannel["courses"]>(`http://localhost:4000/channels/${channelId}`);

export function DependentQueriesPage({ email }: DependentQueriesPageProps) {
  const { data: channelId } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserByEmail(email),
    select: (data) => data.data.channelId,
  });

  const { data: courses } = useQuery({
    queryKey: ["courses", channelId],
    queryFn: () => fetchCoursesByChannelId(channelId!),
    enabled: !!channelId, // The query will not execute until the channelId exists
  });

  console.log(channelId);
  console.log(courses);

  return <h1>Dependent Queries</h1>;
}
