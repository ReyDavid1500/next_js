export default function Card({ image, name }) {
  return (
    <div className="w-full m-auto">
      <img src={image} alt="" className="rounded-full" />
      <p>{name}</p>
    </div>
  );
}
