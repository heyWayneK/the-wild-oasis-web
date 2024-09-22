"use client";
import { useState } from "react";

export default function Counter({ users }) {
  const [count, setCount] = useState(0);
  console.log(`users`, users);
  return (
    <div>
      <p>there are {users.length} users</p>
      <button onClick={(c) => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}
