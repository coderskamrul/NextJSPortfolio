export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: string;
  image: string;
  externalUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "building-custom-chart-component-react",
    title: "Building a Custom Chart Component in React: From Concept to Implementation",
    excerpt: "Learn how to create reusable, performant chart components in React from scratch with detailed implementation guide.",
    date: "Dec 1, 2024",
    readTime: "10 min read",
    category: "Web Development",
    tags: ["React", "JavaScript", "Charts", "Components"],
    author: "Md Kamrul Hasan",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*KfRZ3S0GjYW6WangrAAX1Q.jpeg",
    externalUrl: "https://medium.com/@coderskamrul/building-a-custom-chart-component-in-react-from-concept-to-implementation-5f4a38fdeafa",
    content: `
## Introduction

Building custom chart components in React gives you complete control over visualization, performance, and styling. In this comprehensive guide, I'll walk you through creating a reusable chart component from scratch.

## Why Build Custom Charts?

While libraries like Chart.js and Recharts are excellent, custom charts offer:

- **Full Control**: Complete control over rendering and animations
- **Performance**: Optimized for your specific use case
- **Bundle Size**: No unnecessary library code
- **Styling**: Perfect integration with your design system

## The Foundation

\`\`\`jsx
import React, { useMemo, useRef, useEffect } from 'react';

const CustomChart = ({ data, width = 400, height = 300 }) => {
  const canvasRef = useRef(null);
  
  const processedData = useMemo(() => {
    const max = Math.max(...data.map(d => d.value));
    return data.map(d => ({
      ...d,
      normalized: d.value / max
    }));
  }, [data]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw chart
    drawChart(ctx, processedData, width, height);
  }, [processedData, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};
\`\`\`

## Adding Interactivity

\`\`\`jsx
const [hoveredBar, setHoveredBar] = useState(null);

const handleMouseMove = (e) => {
  const rect = canvasRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Determine which bar is being hovered
  const barIndex = Math.floor(x / barWidth);
  setHoveredBar(barIndex);
};
\`\`\`

## Conclusion

Custom chart components give you the flexibility to create exactly what your application needs while maintaining full control over performance and styling.
    `
  },
  {
    id: 2,
    slug: "multiple-ways-data-fetching-react",
    title: "Multiple Ways to Handle Data Fetching in React (MERN Stack)",
    excerpt: "Explore various approaches to handle data fetching in React applications, from useEffect to React Query and SWR.",
    date: "Mar 14, 2025",
    readTime: "12 min read",
    category: "Web Development",
    tags: ["React", "MERN", "API", "Data Fetching"],
    author: "Md Kamrul Hasan",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*OO5SiA6TkAVdkSue.png",
    externalUrl: "https://medium.com/@coderskamrul/multiple-ways-to-handle-data-fetching-in-react-mern-stack-2ef02382c542",
    content: `
## Data Fetching in Modern React

Data fetching is a fundamental part of any React application. Let's explore the different approaches available in the MERN stack ecosystem.

## Method 1: useEffect with fetch

\`\`\`jsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);
\`\`\`

## Method 2: React Query

\`\`\`jsx
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/api/todos').then(res => res.json())
});
\`\`\`

## Method 3: SWR

\`\`\`jsx
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

const { data, error, isLoading } = useSWR('/api/data', fetcher);
\`\`\`

## Method 4: Server Components (Next.js)

\`\`\`jsx
// This runs on the server
async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <DataDisplay data={data} />;
}
\`\`\`

## Choosing the Right Method

- **Simple apps**: useEffect is sufficient
- **Complex apps**: React Query or SWR for caching
- **Next.js**: Server Components for SEO and performance
    `
  },
  {
    id: 3,
    slug: "react-authentication-jwt",
    title: "React Authentication With JWT: The Complete Guide",
    excerpt: "A comprehensive guide to implementing secure JWT authentication in React applications with best practices.",
    date: "Mar 4, 2024",
    readTime: "15 min read",
    category: "JWT Auth",
    tags: ["React", "JWT", "Authentication", "Security"],
    author: "Md Kamrul Hasan",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*3AYAWNR52tprPciTgWkvYg.jpeg",
    externalUrl: "https://medium.com/@coderskamrul/react-authentication-with-jwt-30d57dc4cd6f",
    content: `
## JWT Authentication in React

JSON Web Tokens (JWT) provide a secure way to authenticate users in React applications. Let's build a complete authentication system.

## Setting Up the Backend

\`\`\`javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({ token, user: { id: user._id, name: user.name } });
});
\`\`\`

## React Auth Context

\`\`\`jsx
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`

## Protected Routes

\`\`\`jsx
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
};
\`\`\`

## Security Best Practices

1. Store tokens securely (httpOnly cookies preferred)
2. Implement token refresh mechanism
3. Use HTTPS in production
4. Validate tokens on every request
    `
  },
  {
    id: 4,
    slug: "beginners-guide-competitive-programming",
    title: "Beginner's Guide to Competitive Programming",
    excerpt: "Start your competitive programming journey with this comprehensive guide covering essential concepts and strategies.",
    date: "April 08, 2026",
    readTime: "20 min read",
    category: "Programming",
    tags: ["DSA", "Algorithms", "Competitive Programming", "Codeforces"],
    author: "Md Kamrul Hasan",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*pVz2WAw9sRw7aT-0",
    externalUrl: "https://medium.com/p/80318750b2cc?postPublishedType=initial",
    content: `
## Starting Your CP Journey

Competitive programming is an excellent way to improve your problem-solving skills. After solving 1500+ problems, here's my guide for beginners.

## Essential Data Structures

\`\`\`cpp
// 1. Arrays and Vectors
vector<int> arr = {1, 2, 3, 4, 5};

// 2. Maps and Sets
map<string, int> mp;
set<int> st;

// 3. Priority Queues
priority_queue<int> maxHeap;
priority_queue<int, vector<int>, greater<int>> minHeap;

// 4. Stacks and Queues
stack<int> s;
queue<int> q;
\`\`\`

## Key Algorithms

### Binary Search

\`\`\`cpp
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
\`\`\`

### Graph BFS

\`\`\`cpp
void bfs(int start, vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
\`\`\`

## Platform Recommendations

1. **Codeforces** - Best for contests
2. **LeetCode** - Great for interviews
3. **CodeChef** - Good for long contests
4. **AtCoder** - Clean problems

## Tips from My Journey

- Solve at least one problem daily
- Understand the solution, don't just copy
- Participate in contests regularly
- Learn from your mistakes
- Never give up!

Happy Coding!
    `
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}
