import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";

interface UserAvatarProps {
  imageUrl?: string | null;
  handle?: string | null;
}

export default function UserAvatar(props: UserAvatarProps) {
  return (
    <Avatar>
      {props.handle && props.imageUrl && (
        <AvatarImage src={props.imageUrl} alt={props.handle} />
      )}
      <AvatarFallback>
        <UserIcon />
      </AvatarFallback>
    </Avatar>
  );
}
