import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { WalletProvider, useWallet } from './WalletContext';
import { 
  Home, CreditCard, LayoutGrid, PieChart as PieIcon, 
  Plus, ArrowRightLeft, MoreHorizontal, Search, Bell, 
  Briefcase, FileText, RefreshCw, Palette, ChevronRight, Calculator,
  TrendingUp, TrendingDown, Wallet, PiggyBank, Smartphone, ShoppingBag, Send
} from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';



const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <div className={`nav-item ${isActive('/') ? 'active' : ''}`} onClick={() => navigate('/')}>
        <Home size={24} /><span>Start</span>
      </div>
      <div className={`nav-item ${isActive('/cards') ? 'active' : ''}`} onClick={() => navigate('/cards')}>
        <CreditCard size={24} /><span>Karty</span>
      </div>
      <div className={`nav-item ${isActive('/analytics') ? 'active' : ''}`} onClick={() => navigate('/analytics')}>
        <TrendingUp size={24} /><span>Hub</span>
      </div>
      <div className={`nav-item ${isActive('/more') ? 'active' : ''}`} onClick={() => navigate('/more')}>
        <LayoutGrid size={24} /><span>Więcej</span>
      </div>
    </nav>
  );
};

const FlipCard = ({ type }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [details, setDetails] = useState({ number: '', cvv: '', exp: '' });

  useEffect(() => {
    if (type === 'virtual') {
      const randNum = Array.from({length: 4}, () => Math.floor(1000 + Math.random() * 9000)).join(' ');
      const randCVV = Math.floor(100 + Math.random() * 899);
      setDetails({ number: `4829 ${randNum}`, cvv: randCVV, exp: '24h' });
    } else {
      setDetails({ number: '4829 1029 4819 2039', cvv: '842', exp: '09/28' });
    }
  }, [type]);

  const isVirtual = type === 'virtual';

  return (
    <div className={`card-scene ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
      <div className="card-inner">
        <div className="card-face" style={isVirtual ? {background: 'linear-gradient(135deg, #db2777, #9333ea)'} : {}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <span style={{fontWeight:'bold', fontStyle:'italic'}}>VISA</span>
            {isVirtual && <span className="one-time-badge">JEDNORAZOWA</span>}
          </div>
          <div className="card-chip"></div>
          <div>
            <div style={{fontSize:'0.8rem', opacity:0.8}}>{isVirtual ? 'Virtual' : 'Metal'}</div>
            <div style={{fontSize:'1.1rem', fontFamily:'monospace'}}>**** {details.number.slice(-4)}</div>
          </div>
        </div>
        <div className="card-face back">
          <div style={{width:'120%', height:'30px', background:'#000', margin:'-20px -20px 20px -20px'}}></div>
          <div><div style={{fontSize:'0.6rem', color:'#64748b'}}>NUMER KARTY</div><div style={{fontFamily:'monospace', fontSize:'1rem'}}>{details.number}</div></div>
          <div style={{display:'flex', gap:'20px'}}>
            <div><div style={{fontSize:'0.6rem', color:'#64748b'}}>CVV</div><div>{details.cvv}</div></div>
            <div><div style={{fontSize:'0.6rem', color:'#64748b'}}>EXP</div><div>{details.exp}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};


const HomePage = () => {
  const { mainBalance, totalWealth, goals, transactions, addToGoal } = useWallet();
  const navigate = useNavigate();

  const handleAddMoneyToGoal = (id) => {
    const amount = prompt("Podaj kwotę do wpłacenia na ten cel:");
    if (amount) addToGoal(id, amount);
  };

  return (
    <div className="app-container">
      <div className="home-header">
        <div className="profile-icon">WS</div>
        <div style={{display:'flex', gap:'15px'}}>
          <Search size={24} color="#94a3b8" />
          <CreditCard size={24} color="#94a3b8" onClick={() => navigate('/cards')}/>
        </div>
      </div>

      <div className="main-balance-section">
        <div className="currency-label">Personal • PLN</div>
        <div className="big-balance">zł {mainBalance.toFixed(2)}</div>
        <div className="accounts-pill" onClick={() => navigate('/analytics')}>Konta</div>
      </div>

      <div className="action-row">
        <div className="circle-btn-wrapper" onClick={() => navigate('/topup')}>
          <div className="circle-btn blue"><Plus size={28}/></div>
          <span className="btn-label">Wpłać</span>
        </div>
        {/* NOWY PRZYCISK PRZELEW */}
        <div className="circle-btn-wrapper" onClick={() => navigate('/transfer')}>
          <div className="circle-btn"><Send size={24} color="#3b82f6"/></div>
          <span className="btn-label">Przelew</span>
        </div>
        <div className="circle-btn-wrapper" onClick={() => navigate('/exchange')}>
          <div className="circle-btn"><RefreshCw size={24} color="#3b82f6"/></div>
          <span className="btn-label">Wymiana</span>
        </div>
        <div className="circle-btn-wrapper" onClick={() => navigate('/more')}>
          <div className="circle-btn"><MoreHorizontal size={24} color="#3b82f6"/></div>
          <span className="btn-label">Więcej</span>
        </div>
      </div>

      <div className="widget-card">
        <div className="widget-title">Całkowity majątek <ChevronRight size={14}/></div>
        <div className="wealth-amount">zł {totalWealth.toFixed(0)}</div>
        
        <div className="wealth-item">
          <div style={{display:'flex', alignItems:'center'}}>
            <div className="wealth-icon" style={{background:'#dbeafe', color:'#3b82f6'}}><Wallet size={18}/></div>
            <div className="wealth-info"><h4>Gotówka</h4></div>
          </div>
          <span>zł {mainBalance.toFixed(0)}</span>
        </div>

        {goals.map(goal => (
           <div key={goal.id} className="wealth-item" onClick={() => handleAddMoneyToGoal(goal.id)} style={{cursor: 'pointer'}}>
             <div style={{display:'flex', alignItems:'center'}}>
               <div className="wealth-icon" style={{background: `${goal.color}20`, color: goal.color}}><PiggyBank size={18}/></div>
               <div className="wealth-info"><h4>{goal.name}</h4><p>Kliknij, by wpłacić</p></div>
             </div>
             <span style={{fontWeight:'bold'}}>zł {goal.current.toFixed(0)}</span>
           </div>
        ))}
      </div>

      <h3 className="section-title">Ostatnie transakcje</h3>
      <div className="widget-card" style={{padding:'10px 20px'}}>
        <div className="transaction-list">
          {transactions.slice(0, 5).map(t => (
            <div key={t.id} className="transaction-item">
               <div style={{display:'flex', alignItems:'center'}}>
                 <div className="t-icon">
                   {t.type === 'income' ? <Plus size={20} color="#10b981"/> : <ShoppingBag size={20} color="#f8fafc"/>}
                 </div>
                 <div>
                   <h4 style={{margin:0, fontSize:'0.9rem'}}>{t.text}</h4>
                   <span style={{fontSize:'0.75rem', color:'#94a3b8'}}>{t.date}</span>
                 </div>
               </div>
               <span style={{color: t.type === 'income' ? '#10b981' : '#f8fafc', fontWeight:'600'}}>
                 {t.type === 'income' ? '+' : ''}{t.amount} zł
               </span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};


const TransferPage = () => {
  const { addTransaction, mainBalance } = useWallet();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', account: '', amount: '', title: '' });

  const handleTransfer = () => {
    const amountVal = parseFloat(formData.amount);
    
    if (!amountVal || amountVal <= 0) return alert("Podaj poprawną kwotę!");
    if (!formData.name || !formData.account) return alert("Uzupełnij dane odbiorcy!");
    if (amountVal > mainBalance) return alert("Nie masz tyle środków!");
    
    addTransaction({
      id: Date.now(),
      text: `Przelew: ${formData.name}`,
      amount: amountVal,
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
    
    alert(`Wysłano ${amountVal} zł do ${formData.name}!`);
    navigate('/');
  };

  return (
    <div className="app-container">
      <div className="home-header">
        <ArrowRightLeft size={24} onClick={() => navigate('/')} style={{transform: 'rotate(180deg)', cursor:'pointer'}}/>
        <h3>Przelew Krajowy</h3>
        <div style={{width:'24px'}}></div>
      </div>

      <div className="transaction-form">
        <label style={{color:'#94a3b8'}}>Odbiorca</label>
        <input type="text" placeholder="Jan Kowalski" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        
        <label style={{color:'#94a3b8'}}>Numer konta</label>
        <input type="text" placeholder="PL 00 0000 0000..." value={formData.account} onChange={e => setFormData({...formData, account: e.target.value})} />
        
        <label style={{color:'#94a3b8'}}>Kwota</label>
        <input type="number" placeholder="0.00" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
        
        <label style={{color:'#94a3b8'}}>Tytuł</label>
        <input type="text" placeholder="Opłata za..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />

        <button className="add-btn" onClick={handleTransfer} style={{marginTop:'10px'}}>Wyślij Przelew</button>
      </div>
      <BottomNav />
    </div>
  );
};


const CardsPage = () => {
  const navigate = useNavigate();
  const [extraCards, setExtraCards] = useState(0);

  return (
    <div className="app-container">
      <div className="home-header">
        <ArrowRightLeft size={24} onClick={() => navigate('/')} style={{transform: 'rotate(180deg)', cursor:'pointer'}}/>
        <h3>Karty</h3>
        <Plus size={24} color="#3b82f6" style={{cursor:'pointer'}} onClick={() => {
          setExtraCards(prev => prev + 1);
          alert("Dodano nową kartę wirtualną!");
        }}/>
      </div>

      <p style={{color:'#94a3b8', marginBottom:'10px'}}>Karta Główna</p>
      <FlipCard type="main" />

      <p style={{color:'#94a3b8', marginBottom:'10px', marginTop:'40px'}}>Karty Wirtualne</p>
      <FlipCard type="virtual" />
      {Array.from({length: extraCards}).map((_, i) => (
         <div key={i} style={{marginTop:'20px'}}>
            <FlipCard type="virtual" />
         </div>
      ))}
      <BottomNav />
    </div>
  );
};


const AnalyticsPage = () => {
  const { income, expense } = useWallet();
  const data = [
    { name: 'Start', value: 0 },
    { name: 'Income', value: income },
    { name: 'Expense', value: income - expense }
  ];

  return (
    <div className="app-container">
      <h3 style={{marginBottom:'5px'}}>Podsumowanie (Bilans)</h3>
      <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px'}}>
        <h1 style={{fontSize:'2rem', margin:0}}>zł {(income - expense).toFixed(2)}</h1>
      </div>
      
      <div style={{display:'flex', gap:'20px', marginBottom:'20px'}}>
         <div>
            <div style={{fontSize:'0.8rem', color:'#94a3b8'}}>Przychody</div>
            <div style={{color:'#10b981', fontSize:'1.2rem', fontWeight:'bold'}}>+ zł {income}</div>
         </div>
         <div>
            <div style={{fontSize:'0.8rem', color:'#94a3b8'}}>Wydatki</div>
            <div style={{color:'#ef4444', fontSize:'1.2rem', fontWeight:'bold'}}>- zł {expense}</div>
         </div>
      </div>

      <div style={{height:'200px', width:'100%', marginBottom:'30px'}}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={0.1} fill="#3b82f6" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <BottomNav />
    </div>
  );
};


const ExchangePage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const rate = 4.25;

  return (
    <div className="app-container">
      <div className="home-header">
        <ArrowRightLeft size={24} onClick={() => navigate('/')} style={{transform: 'rotate(180deg)', cursor:'pointer'}}/>
        <h3>Wymiana Walut</h3>
        <div style={{width:'24px'}}></div>
      </div>
      <div className="transaction-form" style={{marginTop:'20px'}}>
        <label style={{color:'#94a3b8'}}>Sprzedajesz (PLN)</label>
        <input type="number" placeholder="100" value={amount} onChange={e => setAmount(e.target.value)} style={{fontSize:'1.5rem', fontWeight:'bold'}}/>
        <div style={{textAlign:'center', margin:'20px 0', color:'#3b82f6'}}><ArrowRightLeft style={{transform:'rotate(90deg)'}}/><div>Kurs: 1 EUR = {rate} PLN</div></div>
        <label style={{color:'#94a3b8'}}>Kupujesz (EUR)</label>
        <div style={{fontSize:'1.5rem', fontWeight:'bold', padding:'15px', background:'#1e293b', borderRadius:'10px', color: amount ? 'white' : '#64748b'}}>
          {amount ? (parseFloat(amount) / rate).toFixed(2) : '0.00'} €
        </div>
        <button className="add-btn" style={{marginTop:'30px'}} onClick={() => { if(!amount) return; alert(`Wymieniono!`); navigate('/'); }}>Potwierdź</button>
      </div>
      <BottomNav />
    </div>
  );
};


const MorePage = () => {
  const navigate = useNavigate();
  return (
    <div className="app-container">
      <h2 style={{marginBottom:'20px'}}>Więcej</h2>
      <div className="menu-list">
        <div className="menu-item"><FileText color="#3b82f6"/><span className="menu-text">Szczegóły</span></div>
        <div className="menu-item" onClick={() => navigate('/exchange')}><RefreshCw color="#10b981"/><span className="menu-text">Wymiana</span></div>
        <div className="menu-item"><Briefcase color="#f59e0b"/><span className="menu-text">Wyciąg</span></div>
        <div className="menu-item" onClick={() => navigate('/exchange')}><Calculator color="#ec4899"/><span className="menu-text">Przelicznik</span></div>
        <div className="menu-item"><Palette color="#8b5cf6"/><span className="menu-text">Motyw</span></div>
      </div>
      <BottomNav />
    </div>
  );
};


const TopUpPage = () => {
  const { addTransaction } = useWallet();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState(null); 
  const [inputBlik, setInputBlik] = useState('');
  const [cardData, setCardData] = useState({ number: '', date: '', cvv: '' });

  const handleNextStep = () => { if (!amount || parseFloat(amount) <= 0) return alert("Podaj kwotę!"); setStep(2); };
  const confirmTopUp = () => {
    if (method === 'blik' && inputBlik.length !== 6) return alert("Kod BLIK musi mieć 6 cyfr!");
    if (method === 'card' && cardData.number.length < 10) return alert("Błędna karta!");
    addTransaction({ id: Date.now(), text: method === 'blik' ? 'Wpłata BLIK' : 'Wpłata Kartą', amount: parseFloat(amount), type: 'income', date: new Date().toISOString().split('T')[0] });
    alert("Środki dodane!"); navigate('/');
  };

  return (
    <div className="app-container">
      <div className="home-header"><ArrowRightLeft size={24} onClick={() => navigate('/')} style={{transform: 'rotate(180deg)', cursor:'pointer'}}/><h3>Doładuj Konto</h3><div style={{width:'24px'}}></div></div>
      <div className="transaction-form">
        {step === 1 && (<><label>Kwota</label><input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="100"/><button className="add-btn" onClick={handleNextStep}>Dalej</button></>)}
        {step === 2 && (<div className="action-row"><div className="circle-btn-wrapper" onClick={() => { setMethod('blik'); setStep(3); }}><div className="circle-btn"><Smartphone size={24} color="white"/></div><span className="btn-label">BLIK</span></div><div className="circle-btn-wrapper" onClick={() => { setMethod('card'); setStep(3); }}><div className="circle-btn"><CreditCard size={24} color="white"/></div><span className="btn-label">Karta</span></div></div>)}
        {step === 3 && method === 'blik' && (<><label>Kod BLIK</label><input type="number" maxLength={6} value={inputBlik} onChange={e=>setInputBlik(e.target.value)} placeholder="000 000" style={{textAlign:'center', letterSpacing:'5px'}}/><button className="add-btn" onClick={confirmTopUp}>Potwierdź</button></>)}
        {step === 3 && method === 'card' && (<><label>Nr Karty</label><input type="text" value={cardData.number} onChange={e=>setCardData({...cardData, number:e.target.value})}/><div style={{display:'flex', gap:'10px'}}><input placeholder="MM/YY"/><input placeholder="CVV"/></div><button className="add-btn" onClick={confirmTopUp}>Zapłać</button></>)}
      </div>
      <BottomNav />
    </div>
  );
};


function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/more" element={<MorePage />} />
          <Route path="/topup" element={<TopUpPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/transfer" element={<TransferPage />} />
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;