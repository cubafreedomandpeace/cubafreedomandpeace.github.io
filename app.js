const { useState } = React;
const { Globe, Heart, Users, BookOpen, ChevronRight, Edit, Trash2, Plus, X, Save } = lucide;

const Icon = ({ icon: IconComponent, ...props }) => {
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (ref.current) {
            ref.current.innerHTML = '';
            lucide.createElement(IconComponent).render(ref.current);
        }
    }, [IconComponent]);
    return React.createElement('i', { ref, ...props });
};

const CubaFreedomSite = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Standing with the Cuban People",
            excerpt: "Our commitment to supporting democracy and human rights in Cuba remains unwavering.",
            content: "The Cuban people deserve freedom, dignity, and the right to determine their own future. We stand in solidarity with those who peacefully advocate for change and human rights.",
            date: "2025-10-05",
            image: "https://images.unsplash.com/photo-1599582827103-19008a46e968?w=800&h=400&fit=crop"
        },
        {
            id: 2,
            title: "Hope for a Brighter Tomorrow",
            excerpt: "Building bridges between communities for lasting peace and understanding.",
            content: "Through dialogue, education, and mutual respect, we can create pathways to positive change. Our mission is to amplify voices calling for peaceful transformation.",
            date: "2025-09-28",
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop"
        }
    ]);

    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState('');
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [showPostForm, setShowPostForm] = useState(false);
    const [currentView, setCurrentView] = useState('home');

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleLogin = () => {
        if (password === 'admin123') {
            setIsAdmin(true);
            setShowAdminLogin(false);
            setPassword('');
        } else {
            alert('Invalid password');
        }
    };

    const handleLogout = () => {
        setIsAdmin(false);
        setCurrentView('home');
    };

    const handleDeletePost = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(p => p.id !== id));
        }
    };

    const handleEditPost = (post) => {
        setEditingPost(post.id);
        setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            image: post.image,
            date: post.date
        });
        setShowPostForm(true);
    };

    const handleSavePost = () => {
        if (!formData.title || !formData.excerpt || !formData.content) {
            alert('Please fill in all required fields');
            return;
        }

        if (editingPost) {
            setPosts(posts.map(p => p.id === editingPost ? { ...formData, id: editingPost } : p));
        } else {
            setPosts([{ ...formData, id: Date.now() }, ...posts]);
        }

        setFormData({ title: '', excerpt: '', content: '', image: '', date: new Date().toISOString().split('T')[0] });
        setShowPostForm(false);
        setEditingPost(null);
    };

    const handleCancelEdit = () => {
        setFormData({ title: '', excerpt: '', content: '', image: '', date: new Date().toISOString().split('T')[0] });
        setShowPostForm(false);
        setEditingPost(null);
    };

    return (
        
            
                
                    
                        
                            
                            
                                Cuba Freedom & Peace
                                Unidos por la libertad y la paz
                            
                        
                        
                            <button onClick={() => setCurrentView('home')} className="text-gray-700 hover:text-blue-600 transition">Home
                            <button onClick={() => setCurrentView('about')} className="text-gray-700 hover:text-blue-600 transition">About
                            <button onClick={() => setCurrentView('posts')} className="text-gray-700 hover:text-blue-600 transition">News
                            <button onClick={() => setCurrentView('contact')} className="text-gray-700 hover:text-blue-600 transition">Contact
                            {isAdmin ? (
                                
                                    Logout
                                
                            ) : (
                                <button onClick={() => setShowAdminLogin(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                    Admin
                                
                            )}
                        
                    
                
            

            {showAdminLogin && (
                
                    
                        
                            Admin Login
                            <button onClick={() => setShowAdminLogin(false)} className="text-gray-500 hover:text-gray-700">
                                
                            
                        
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        
                            Login
                        
                        Demo password: admin123
                    
                
            )}

            {showPostForm && isAdmin && (
                
                    
                        
                            {editingPost ? 'Edit Post' : 'New Post'}
                            
                                
                            
                        
                        
                            
                                Title *
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            
                            
                                Excerpt *
                                <input
                                    type="text"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            
                            
                                Content *
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            
                            
                                Image URL
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            
                            
                                Date
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            
                        
                        
                            
                                
                                Save Post
                            
                            
                                Cancel
                            
                        
                    
                
            )}

            
                {currentView === 'home' && (
                    <>
                        
                            
                                Together for Freedom and Peace in Cuba
                            
                            
                                We advocate for human rights, democracy, and peaceful change in Cuba. Join us in supporting the Cuban people's quest for freedom and dignity.
                            
                            <button onClick={() => setCurrentView('posts')} className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition inline-flex items-center">
                                Learn More 
                            
                        

                        
                            
                                
                                Human Rights
                                Advocating for the fundamental rights and freedoms of all Cuban citizens.
                            
                            
                                
                                Unity
                                Building bridges and fostering solidarity within and beyond Cuban communities.
                            
                            
                                
                                Education
                                Raising awareness about Cuba's situation and promoting informed dialogue.
                            
                        

                        
                            
                                Latest News
                                <button onClick={() => setCurrentView('posts')} className="text-blue-600 hover:text-blue-700 font-semibold">
                                    View All →
                                
                            
                            
                                {posts.slice(0, 2).map(post => (
                                    
                                        {post.image && (
                                            
                                        )}
                                        
                                            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            {post.title}
                                            {post.excerpt}
                                            Read More →
                                        
                                    
                                ))}
                            
                        
                    </>
                )}

                {currentView === 'posts' && (
                    
                        
                            News & Updates
                            {isAdmin && (
                                <button onClick={() => { setShowPostForm(true); setEditingPost(null); }} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-flex items-center">
                                    
                                    New Post
                                
                            )}
                        
                        
                            {posts.map(post => (
                                
                                    
                                        {post.image && (
                                            
                                        )}
                                        
                                            
                                                
                                                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    {post.title}
                                                
                                                {isAdmin && (
                                                    
                                                        <button onClick={() => handleEditPost(post)} className="text-blue-600 hover:text-blue-700">
                                                            
                                                        
                                                        <button onClick={() => handleDeletePost(post.id)} className="text-red-600 hover:text-red-700">
                                                            
                                                        
                                                    
                                                )}
                                            
                                            {post.content}
                                        
                                    
                                
                            ))}
                        
                    
                )}

                {currentView === 'about' && (
                    
                        About Our Mission
                        
                            
                                Cuba Freedom & Peace is dedicated to supporting the Cuban people in their pursuit of democracy, human rights, and self-determination. We believe in peaceful dialogue, international solidarity, and the power of collective action to bring about positive change.
                            
                            
                                Our organization works to amplify the voices of Cuban civil society, provide accurate information about the situation in Cuba, and advocate for policies that support freedom and peace on the island.
                            
                            
                                We stand with all those who work peacefully for a better future for Cuba, where human rights are respected, democracy flourishes, and all citizens can live in dignity and freedom.
                            
                        
                    
                )}

                {currentView === 'contact' && (
                    
                        Get In Touch
                        
                            
                                
                                    Name
                                    
                                
                                
                                    Email
                                    
                                
                                
                                    Message
                                    
                                
                                <button onClick={(e) => { e.preventDefault(); alert('Message sent! (Demo)'); }} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                                    Send Message
                                
                            
                        
                    
                )}
            

            
                
                    
                        
                            Cuba Freedom & Peace
                            Supporting democracy and human rights in Cuba through peaceful advocacy and solidarity.
                        
                        
                            Quick Links
                            
                                <button onClick={() => setCurrentView('home')} className="block text-gray-400 hover:text-white transition">Home
                                <button onClick={() => setCurrentView('about')} className="block text-gray-400 hover:text-white transition">About
                                <button onClick={() => setCurrentView('posts')} className="block text-gray-400 hover:text-white transition">News
                                <button onClick={() => setCurrentView('contact')} className="block text-gray-400 hover:text-white transition">Contact
                            
                        
                        
                            Connect
                            Stay updated with our latest news and initiatives.
                            
                                
                                
                                
                            
                        
                    
                    
                        &copy; 2025 Cuba Freedom & Peace. All rights reserved.
                    
                
            
        
    );
};

ReactDOM.render(, document.getElementById('root'));