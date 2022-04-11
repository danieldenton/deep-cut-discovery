export default function Landing() {
  return (
    <div>
      <form onSubmit>
        <div className="column">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="off"
            // onChange={(e) => setForm({ ...form, email: e.target.value })}
            value
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            // onChange={(e) => setForm({ ...form, password: e.target.value })}
            value
          />

          <button className="btn" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
