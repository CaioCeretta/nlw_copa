export function Tweet(props) {
  return (
    <div>
      <h1>Tweet</h1>
      <p>{props.text}</p>
      <button>Curtir</button>
    </div>
  )
}