"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, X, Loader2, Upload, Lock } from "lucide-react";
import IconRenderer from "@/components/ui/IconRenderer";

// --- Types ---

interface TechItem {
  name: string;
  type: "font" | "lucide";
  value: string;
  color?: string;
}

interface SkillCategory {
  category: string;
  desc: string;
  icon: string;
  techs: TechItem[];
}

interface ProjectItem {
  title: string;
  subtitle: string;
  image: string;
  metric: string;
  description: string;
  stack: string[];
  link: string;
}

// --- Components ---

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"skills" | "projects">("skills");
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        fetchData(storedToken); 
    } else {
        setLoading(false);
    }
  }, []);

  const handleLogin = async (password: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setToken(data.token);
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        fetchData(data.token); 
      } else {
        setMessage({ text: "Invalid Password", type: "error" });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
        setMessage({ text: "Login Error", type: "error" });
    } finally {
        setLoading(false);
    }
  };

  const handleLogout = () => {
      setToken(null);
      localStorage.removeItem('admin_token');
      setIsAuthenticated(false);
      setMessage({ text: "Session Expired. Please Login Again.", type: "error" });
  };

  const fetchData = async (authToken: string) => {
    setLoading(true);
    try {
      const [skillsRes, projectsRes] = await Promise.all([
        fetch("/api/admin/skills"),
        fetch("/api/admin/projects")
      ]);
      
      if (!skillsRes.ok || !projectsRes.ok) throw new Error("Failed to fetch data");

      setSkills(await skillsRes.json());
      setProjects(await projectsRes.json());
    } catch (err) {
      console.error(err);
      setMessage({ text: "Failed to load data.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Save Handlers
  const saveSkills = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(skills),
      });
      
      if (res.status === 401) {
          handleLogout();
          return;
      }
      
      if (!res.ok) throw new Error("Failed");
      setMessage({ text: "Skills saved successfully!", type: "success" });
    } catch (err) {
      setMessage({ text: "Error saving skills.", type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const saveProjects = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(projects),
      });

      if (res.status === 401) {
          handleLogout();
          return;
      }

      if (!res.ok) throw new Error("Failed");
      setMessage({ text: "Projects saved successfully!", type: "success" });
    } catch (err) {
      setMessage({ text: "Error saving projects.", type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleImageUpload = async (idx: number, file: File) => {
      if (!token) return;
      const formData = new FormData();
      formData.append('file', file);

      try {
          const res = await fetch('/api/upload', {
              method: 'POST',
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              body: formData,
          });

          if (res.status === 401) {
              handleLogout();
              return;
          }

          if (!res.ok) throw new Error("Upload failed");
          
          const data = await res.json();
          
          // Helper to update project state deeply
          const newProjects = [...projects];
          newProjects[idx] = { ...newProjects[idx], image: data.url };
          setProjects(newProjects);

      } catch (error) {
          alert("Failed to upload image.");
      }
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} loading={loading} message={message} />;
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white"><Loader2 className="animate-spin mr-2" /> Loading Admin...</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold font-mono tracking-widest text-neon">ADMIN::DASHBOARD</h1>
            <div className="flex gap-4">
                <button 
                    onClick={() => setActiveTab("skills")}
                    className={`px-4 py-2 rounded-md font-bold transition-colors ${activeTab === "skills" ? "bg-neon text-black" : "hover:bg-white/10"}`}
                >
                    SKILLS
                </button>
                <button 
                    onClick={() => setActiveTab("projects")}
                    className={`px-4 py-2 rounded-md font-bold transition-colors ${activeTab === "projects" ? "bg-neon text-black" : "hover:bg-white/10"}`}
                >
                    PROJECTS
                </button>
                <button 
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md font-bold text-red-400 hover:bg-white/10 transition-colors"
                >
                    LOGOUT
                </button>
            </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        
        {message && (
            <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white font-bold animate-in slide-in-from-bottom-5 ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                {message.text}
            </div>
        )}

        {activeTab === "skills" ? (
            <SkillsEditor 
                skills={skills} 
                setSkills={setSkills} 
                onSave={saveSkills} 
                saving={saving} 
            />
        ) : (
            <ProjectsEditor 
                projects={projects} 
                setProjects={setProjects} 
                onSave={saveProjects} 
                handleUpload={handleImageUpload}
                saving={saving} 
            />
        )}
      </main>
    </div>
  );
}

// --- Login Screen ---

function LoginScreen({ onLogin, loading, message }: { onLogin: (pw: string) => void, loading: boolean, message: any }) {
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
            <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-2xl">
                <div className="flex justify-center mb-6 text-neon">
                    <Lock size={48} />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6 font-display">Restricted Access</h2>
                <form onSubmit={(e) => { e.preventDefault(); onLogin(password); }} className="space-y-4">
                    <div>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-neon transition-colors"
                            placeholder="Enter Admin Password"
                            autoFocus
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-neon text-black font-bold py-3 rounded-lg hover:bg-neon/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin mx-auto" /> : "Authenticate"}
                    </button>
                </form>
                {message && (
                    <div className={`mt-4 p-3 rounded text-center text-sm font-bold ${message.type === 'error' ? 'text-red-400 bg-red-400/10' : 'text-green-400'}`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
}


// --- Skills Editor ---

function SkillsEditor({ skills, setSkills, onSave, saving }: { skills: SkillCategory[], setSkills: any, onSave: any, saving: boolean }) {
    
    const updateCategory = (idx: number, field: string, val: string) => {
        const newSkills = [...skills];
        (newSkills[idx] as any)[field] = val;
        setSkills(newSkills);
    };

    const addCategory = () => {
        setSkills([...skills, { category: "New Category", desc: "Description", icon: "Terminal", techs: [] }]);
    };

    const removeCategory = (idx: number) => {
        if(confirm("Delete this category?")) {
            const newSkills = skills.filter((_, i) => i !== idx);
            setSkills(newSkills);
        }
    };

    const updateTech = (catIdx: number, techIdx: number, field: string, val: string) => {
        const newSkills = [...skills];
        (newSkills[catIdx].techs[techIdx] as any)[field] = val;
        setSkills(newSkills);
    };

    const addTech = (catIdx: number) => {
        const newSkills = [...skills];
        newSkills[catIdx].techs.push({ name: "New Tech", type: "font", value: "devicon-python-plain" });
        setSkills(newSkills);
    };

    const removeTech = (catIdx: number, techIdx: number) => {
        const newSkills = [...skills];
        newSkills[catIdx].techs = newSkills[catIdx].techs.filter((_, i) => i !== techIdx);
        setSkills(newSkills);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Tech Stack</h2>
                <button onClick={onSave} disabled={saving} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 disabled:opacity-50">
                    {saving ? <Loader2 className="animate-spin" /> : <Save />} Save Changes
                </button>
            </div>

            <div className="grid gap-8">
                {skills.map((cat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        {/* Category Header */}
                        <div className="flex justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-100">
                            <div className="flex-1 grid gap-4">
                                <div className="flex gap-4">
                                    <div className="w-1/3">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category Name</label>
                                        <input 
                                            value={cat.category} 
                                            onChange={(e) => updateCategory(i, "category", e.target.value)}
                                            className="w-full p-2 border rounded font-bold"
                                        />
                                    </div>
                                    <div className="w-1/4">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lucide Icon Name</label>
                                        <div className="flex gap-2">
                                            <input 
                                                value={cat.icon} 
                                                onChange={(e) => updateCategory(i, "icon", e.target.value)}
                                                className="w-full p-2 border rounded"
                                            />
                                            <div className="p-2 bg-slate-100 rounded text-slate-600">
                                                <IconRenderer name={cat.icon} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                                    <textarea 
                                        value={cat.desc} 
                                        onChange={(e) => updateCategory(i, "desc", e.target.value)}
                                        className="w-full p-2 border rounded h-20 text-sm"
                                    />
                                </div>
                            </div>
                            <button onClick={() => removeCategory(i)} className="text-red-400 hover:text-red-600 p-2">
                                <Trash2 size={20} />
                            </button>
                        </div>

                        {/* Techs List */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-bold text-slate-500 uppercase">Technologies</h3>
                                <button onClick={() => addTech(i)} className="flex items-center gap-1 text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded font-bold text-slate-700">
                                    <Plus size={14} /> Add Tech
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {cat.techs.map((tech, tIdx) => (
                                    <div key={tIdx} className="bg-slate-50 p-3 rounded border border-slate-200 relative group">
                                        <button onClick={() => removeTech(i, tIdx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500">
                                            <X size={16} />
                                        </button>
                                        
                                        <div className="space-y-2 pr-6">
                                            <input 
                                                value={tech.name} 
                                                onChange={(e) => updateTech(i, tIdx, "name", e.target.value)}
                                                className="w-full p-1 text-sm font-bold bg-transparent border-b border-transparent focus:border-slate-300 outline-none"
                                                placeholder="Tech Name"
                                            />
                                            <div className="flex gap-2">
                                                <select 
                                                    value={tech.type}
                                                    onChange={(e) => updateTech(i, tIdx, "type", e.target.value)}
                                                    className="text-xs p-1 rounded border bg-white"
                                                >
                                                    <option value="font">DevIcon</option>
                                                    <option value="lucide">Lucide</option>
                                                </select>
                                                <input 
                                                    value={tech.value} 
                                                    onChange={(e) => updateTech(i, tIdx, "value", e.target.value)}
                                                    className="flex-1 p-1 text-xs border rounded bg-white"
                                                    placeholder="Icon class or name"
                                                />
                                            </div>
                                            {tech.type === 'lucide' && (
                                                <input 
                                                    value={tech.color || ''} 
                                                    onChange={(e) => updateTech(i, tIdx, "color", e.target.value)}
                                                    className="w-full p-1 text-xs border rounded bg-white"
                                                    placeholder="Color class (e.g. text-blue-500)"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={addCategory} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 font-bold hover:border-slate-400 hover:text-slate-600 flex items-center justify-center gap-2">
                <Plus /> Add New Project
            </button>
        </div>
    );
}

// --- Projects Editor ---

function ProjectsEditor({ projects, setProjects, onSave, handleUpload, saving }: { projects: ProjectItem[], setProjects: any, onSave: any, handleUpload: any, saving: boolean }) {

    const updateProject = (idx: number, field: string, val: any) => {
        const newProjects = [...projects];
        (newProjects[idx] as any)[field] = val;
        setProjects(newProjects);
    };

    const addProject = () => {
        setProjects([...projects, { 
            title: "New Project", 
            subtitle: "Subtitle", 
            image: "https://placehold.co/600x400", 
            metric: "Stats", 
            description: "Desc", 
            stack: ["Tool"], 
            link: "#" 
        }]);
    };

    const removeProject = (idx: number) => {
        if(confirm("Delete this project?")) {
            setProjects(projects.filter((_, i) => i !== idx));
        }
    };

    const handleImageUploadLocal = (idx: number, file: File) => {
        handleUpload(idx, file);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Projects</h2>
                <button onClick={onSave} disabled={saving} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 disabled:opacity-50">
                    {saving ? <Loader2 className="animate-spin" /> : <Save />} Save Changes
                </button>
            </div>

            <div className="grid gap-8">
                {projects.map((proj, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8">
                        {/* Preview Image */}
                        <div className="w-full md:w-1/4 shrink-0">
                            <div className="aspect-[4/3] rounded-lg bg-slate-100 overflow-hidden mb-2 relative group">
                                <img src={proj.image} className="w-full h-full object-cover" alt="Preview" />
                                <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded text-xs font-bold text-slate-800">{proj.metric}</div>
                                
                                {/* Image Overlay for Upload */}
                                <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity duration-200">
                                    <Upload size={24} className="mb-2" />
                                    <span className="text-xs font-bold">Change Image</span>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                handleImageUploadLocal(i, e.target.files[0]);
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                            <input 
                                value={proj.image}
                                onChange={(e) => updateProject(i, "image", e.target.value)}
                                className="w-full text-xs p-2 border rounded text-slate-500 font-mono"
                                placeholder="Image URL"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1 grid gap-4">
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                                            <input 
                                                value={proj.title} 
                                                onChange={(e) => updateProject(i, "title", e.target.value)}
                                                className="w-full p-2 border rounded font-bold text-lg"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subtitle</label>
                                            <input 
                                                value={proj.subtitle} 
                                                onChange={(e) => updateProject(i, "subtitle", e.target.value)}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-1/3">
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Metric Badge</label>
                                            <input 
                                                value={proj.metric} 
                                                onChange={(e) => updateProject(i, "metric", e.target.value)}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Link URL</label>
                                            <input 
                                                value={proj.link} 
                                                onChange={(e) => updateProject(i, "link", e.target.value)}
                                                className="w-full p-2 border rounded font-mono text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                                        <textarea 
                                            value={proj.description} 
                                            onChange={(e) => updateProject(i, "description", e.target.value)}
                                            className="w-full p-2 border rounded h-20 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tech Stack (comma separated)</label>
                                        <input 
                                            value={proj.stack.join(", ")} 
                                            onChange={(e) => updateProject(i, "stack", e.target.value.split(",").map(s => s.trim()))}
                                            className="w-full p-2 border rounded"
                                            placeholder="React, Next.js, TypeScript"
                                        />
                                    </div>
                                </div>
                                <button onClick={() => removeProject(i)} className="text-red-400 hover:text-red-600 p-2 ml-4">
                                    <Trash2 size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={addProject} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 font-bold hover:border-slate-400 hover:text-slate-600 flex items-center justify-center gap-2">
                <Plus /> Add New Project
            </button>
        </div>
    );
}