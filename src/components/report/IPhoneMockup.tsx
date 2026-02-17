interface IPhoneMockupProps {
  imageSrc: string;
  alt?: string;
}

export default function IPhoneMockup({ imageSrc, alt = "Phone preview" }: IPhoneMockupProps) {
  return (
    <div className="flex justify-center items-start -mt-4">
      <img
        src={imageSrc}
        alt={alt}
        className="w-[260px] h-auto drop-shadow-2xl"
        draggable={false}
        style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}
      />
    </div>
  );
}
