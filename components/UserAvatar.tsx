type AvatarProps = {
    image: string;
};

export const UserAvatar = ({ image }: AvatarProps) => {
    return (
        <div className="border-2 border-gray-200 w-[28px] h-[28p] rounded-full bg-white flex items-center justify-center text-xl cursor-default">
            {image}
        </div>
    );
};
