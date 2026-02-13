import React, { useState, useEffect } from 'react';
import { UserPlus, Plus, Link2, Eye, LogOut, Copy, CheckCircle2, Heart, ExternalLink } from 'lucide-react';
import { database, Invite } from '../lib/database';

interface AdminPanelProps {
    onLogin?: (username: string) => void;
    initialIsRegister?: boolean;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogin, initialIsRegister = true }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<string>('');
    const [isRegister, setIsRegister] = useState(initialIsRegister);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Create Invite State
    const [targetName, setTargetName] = useState('');
    const [invitePath, setInvitePath] = useState('');
    const [slogan, setSlogan] = useState('');
    const [explanation, setExplanation] = useState('');
    const [invites, setInvites] = useState<Invite[]>([]);
    const [viewingInvite, setViewingInvite] = useState<Invite | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('valentine_user');
        if (saved) {
            setIsLoggedIn(true);
            setCurrentUser(saved);
            loadInvites(saved);
        }
    }, []);

    const loadInvites = (user: string) => {
        const userInvites = database.getInvitesByUser(user);
        setInvites(userInvites);
    };

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            if (isRegister) {
                database.createUser({ username, password });
                setSuccess('Account created! You can now login.');
                setIsRegister(false);
            } else {
                const success = database.login({ username, password });
                if (success) {
                    setIsLoggedIn(true);
                    setCurrentUser(username);
                    localStorage.setItem('valentine_user', username);
                    loadInvites(username);
                    if (onLogin) onLogin(username);
                } else {
                    setError('Invalid username or password');
                }
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleCreateInvite = (e: React.FormEvent) => {
        e.preventDefault();
        const slug = invitePath.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

        if (!slug) {
            setError('Please enter a valid invitation name');
            return;
        }

        const newInvite = database.createInvite({
            creator: currentUser,
            targetName,
            slug,
            slogan,
            explanation
        });
        setInvites([newInvite, ...invites]);
        setTargetName('');
        setInvitePath('');
        setSlogan('');
        setExplanation('');
        setSuccess('Invitation created successfully!');
        setTimeout(() => setSuccess(''), 3000);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setCurrentUser('');
        localStorage.removeItem('valentine_user');
        window.location.reload(); // Refresh to update App state if needed
    };

    const copyLink = (invite: Invite) => {
        const url = `${window.location.protocol}//${window.location.host}/${invite.creator.toLowerCase()}/${invite.slug.toLowerCase()}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopiedId(invite.id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    };

    if (!isLoggedIn) {
        return (
            <div className="space-y-6">
                <div className="text-center mb-6">
                    <Heart className="w-12 h-12 text-valentine-500 mx-auto mb-2 animate-pulse fill-valentine-500/20" />
                    <h3 className="text-2xl font-hand font-bold text-white tracking-wide">Join the Romance</h3>
                    <p className="text-valentine-300/60 text-sm italic">Create your own magical Valentine invitation</p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-valentine-300 uppercase tracking-widest ml-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-valentine-500 transition-all shadow-inner"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-valentine-300 uppercase tracking-widest ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-valentine-500 transition-all shadow-inner"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {error && <p className="text-red-400 text-xs bg-red-400/10 p-3 rounded-xl border border-red-400/20 animate-shake">{error}</p>}
                    {success && <p className="text-green-400 text-xs bg-green-400/10 p-3 rounded-xl border border-green-400/20">{success}</p>}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-valentine-600 to-valentine-500 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-valentine-500/30 text-sm uppercase tracking-widest mt-2"
                    >
                        {isRegister ? 'Create Account' : 'Login'}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsRegister(!isRegister)}
                        className="w-full text-white/40 text-xs hover:text-white transition-colors pt-2"
                    >
                        {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Hey, {currentUser}!</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Creator Mode Active</p>
                </div>
                <button onClick={logout} className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300">
                    <LogOut className="w-5 h-5" />
                </button>
            </div>

            {/* Create Section */}
            <div className="bg-white/5 rounded-[2rem] p-6 border border-white/5 shadow-inner">
                <div className="mb-6">
                    <h4 className="text-xl font-hand font-bold text-valentine-300">Share your love</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Design your invitation details</p>
                </div>
                <form onSubmit={handleCreateInvite} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Target Name (e.g. Sarah)"
                        value={targetName}
                        onChange={(e) => setTargetName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-valentine-500 shadow-inner"
                        required
                    />
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xs font-mono">
                            /{currentUser.toLowerCase()}/
                        </span>
                        <input
                            type="text"
                            placeholder="invitation-name"
                            value={invitePath}
                            onChange={(e) => setInvitePath(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-24 pr-4 py-3 text-white text-sm focus:outline-none focus:border-valentine-500 shadow-inner font-mono"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Head Slogan (e.g. Will you be mine?)"
                        value={slogan}
                        onChange={(e) => setSlogan(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-valentine-500 shadow-inner"
                        required
                    />
                    <textarea
                        placeholder="Short Message (Optional)"
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-valentine-500 min-h-[100px] shadow-inner"
                    />
                    <button className="w-full bg-valentine-600 hover:bg-valentine-500 text-white font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-widest shadow-lg shadow-valentine-600/20">
                        Create Invitation
                    </button>
                </form>
            </div>

            {/* List Section */}
            <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Active Invites</h4>
                {invites.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                        <p className="text-white/20 text-xs italic">Your list is empty...</p>
                    </div>
                ) : (
                    invites.map((invite) => (
                        <div key={invite.id} className="bg-glass rounded-2xl p-4 border border-white/5 hover:border-valentine-500/40 transition-all duration-300 group">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h5 className="font-bold text-white uppercase tracking-tight text-sm group-hover:text-valentine-400 transition-colors">{invite.targetName}</h5>
                                    <p className="text-[9px] text-white/30 font-mono tracking-tighter">
                                        /{invite.creator.toLowerCase()}/{invite.slug.toLowerCase()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            const url = `${window.location.protocol}//${window.location.host}/${invite.creator.toLowerCase()}/${invite.slug.toLowerCase()}`;
                                            window.open(url, '_blank');
                                        }}
                                        className="p-2.5 rounded-xl bg-white/5 text-valentine-300 hover:bg-valentine-500/20 transition-all duration-300"
                                        title="Open in new tab"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => copyLink(invite)}
                                        className={`p-2.5 rounded-xl transition-all duration-300 ${copiedId === invite.id ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-valentine-300 hover:bg-valentine-500/20'}`}
                                        title="Copy link"
                                    >
                                        {copiedId === invite.id ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => setViewingInvite(viewingInvite?.id === invite.id ? null : invite)}
                                        className={`p-2.5 rounded-xl transition-all duration-300 ${viewingInvite?.id === invite.id ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-blue-400 hover:bg-blue-500/20'}`}
                                        title="View responses"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {viewingInvite?.id === invite.id && (
                                <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in-scale">
                                    <h6 className="text-[9px] font-bold text-white/30 uppercase mb-3 tracking-widest">Responses ({invite.answers.length})</h6>
                                    {invite.answers.length === 0 ? (
                                        <p className="text-[10px] text-white/30 italic py-2">No activity recorded yet...</p>
                                    ) : (
                                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                                            {invite.answers.map((ans, i) => (
                                                <div key={i} className="flex justify-between items-center text-[11px] bg-white/5 p-3 rounded-xl border border-white/5 shadow-inner">
                                                    <span className="text-white/70 font-medium">{ans.name}</span>
                                                    <span className={`font-bold px-2 py-0.5 rounded-md text-[9px] ${ans.answer === 'yes' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'} uppercase`}>
                                                        {ans.answer === 'yes' ? 'Accepted ✓' : 'Rejected ✗'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
