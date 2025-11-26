import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  size: string;
  power: string;
  price: number;
  oldPrice?: number;
  image: string;
  features: string[];
  description: string;
  popular?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Ring Light Mini',
    size: '26 см',
    power: '24W',
    price: 2990,
    oldPrice: 3990,
    image: 'https://cdn.poehali.dev/projects/ce262806-4f47-4270-9c02-f0afa01a62ba/files/5dedfe3e-63a0-4dc9-9aea-0a83d30b18da.jpg',
    description: 'Компактная кольцевая лампа идеально подходит для блогеров и любителей селфи. Легкая, портативная, с USB-питанием.',
    features: ['USB питание', '3 режима света', 'Держатель для телефона', 'Компактный размер', 'Регулировка яркости']
  },
  {
    id: 2,
    name: 'Ring Light Pro',
    size: '33 см',
    power: '36W',
    price: 4990,
    oldPrice: 6490,
    popular: true,
    image: 'https://cdn.poehali.dev/projects/ce262806-4f47-4270-9c02-f0afa01a62ba/files/e82485a0-85a8-4e98-97dc-7937cf2306c6.jpg',
    description: 'Профессиональная лампа для создателей контента. Мощный свет, дистанционное управление, надежный штатив 2 метра.',
    features: ['220V + USB', '10 уровней яркости', 'Bluetooth пульт', 'Штатив 2м в комплекте', '3 цветовых режима']
  },
  {
    id: 3,
    name: 'Ring Light Studio',
    size: '45 см',
    power: '55W',
    price: 7990,
    oldPrice: 9990,
    image: 'https://cdn.poehali.dev/projects/ce262806-4f47-4270-9c02-f0afa01a62ba/files/a7839e47-60e6-4d2b-aaa5-c0586670de63.jpg',
    description: 'Студийное освещение профессионального уровня. RGB подсветка, максимальная мощность, высокий штатив для любых съемок.',
    features: ['Профессиональный уровень', 'RGB подсветка 16M цветов', 'Пульт ДУ', 'Штатив 2.1м + чехол', 'Диммер 1-100%']
  }
];

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const predefinedAnswers: Record<string, string> = {
  'доставка': 'Доставка по России от 1 до 7 дней. Бесплатная доставка при заказе от 5000₽. Курьером по Москве — 300₽, СДЭК — от 350₽.',
  'оплата': 'Принимаем оплату: картой онлайн, наличными курьеру, переводом на карту, через СБП. Предоплата не требуется!',
  'гарантия': 'Гарантия на все лампы 1 год. Обмен/возврат в течение 14 дней. Бесплатный ремонт по гарантии.',
  'какую': 'Для селфи и блогов — Mini 26см. Для стримов и видео — Pro 33см. Для профессиональной фотосъемки — Studio 45см.',
  'отличие': 'Mini — компактная с USB. Pro — мощнее, есть пульт и штатив 2м. Studio — самая большая, RGB подсветка, для студий.',
  'rgb': 'RGB подсветка позволяет выбирать любой цвет из 16 миллионов оттенков для креативных съемок и создания атмосферы.',
  'штатив': 'Mini — без штатива (настольная). Pro — штатив 2м. Studio — штатив 2.1м + чехол для переноски.',
  'телефон': 'Все модели имеют держатель для телефона. Подходит для любых смартфонов от 6 до 9 см шириной.'
};

export default function Index() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Здравствуйте! Я помогу выбрать кольцевую лампу. Спрашивайте о доставке, характеристиках, различиях между моделями!' }
  ]);
  const [userInput, setUserInput] = useState('');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newUserMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newUserMessage]);

    const lowerInput = userInput.toLowerCase();
    let response = 'Спасибо за вопрос! По этому вопросу свяжитесь с нами: +7 (999) 123-45-67';

    for (const [key, answer] of Object.entries(predefinedAnswers)) {
      if (lowerInput.includes(key)) {
        response = answer;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 500);

    setUserInput('');
  };

  const handleBuy = (product: Product) => {
    toast({
      title: 'Товар добавлен!',
      description: `${product.name} добавлен в корзину. Цена: ${product.price}₽`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 text-sm px-4 py-2">
              🔥 Скидки до 35% • Бесплатная доставка от 5000₽
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent leading-tight">
              Кольцевые лампы для идеального освещения
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Профессиональный свет для фото, видео, стримов и блогов. Выбери свою лампу!
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Truck" size={20} className="text-orange-500" />
                <span>Доставка 1-7 дней</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={20} className="text-orange-500" />
                <span>Гарантия 1 год</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CreditCard" size={20} className="text-orange-500" />
                <span>Оплата при получении</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">
            Наши кольцевые лампы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <Card 
                key={product.id}
                className={`relative hover:shadow-2xl transition-all animate-scale-in ${product.popular ? 'border-4 border-orange-500' : 'border-2'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {product.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 text-sm px-4 py-1">
                      ⭐ Хит продаж
                    </Badge>
                  </div>
                )}
                
                <div className="relative aspect-square overflow-hidden rounded-t-lg bg-white">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    <Badge variant="secondary">{product.size}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    Мощность: {product.power}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground mt-2">
                    {product.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2 text-sm">Характеристики:</p>
                    <ul className="space-y-1">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Icon name="Check" size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t">
                    {product.oldPrice && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground line-through">
                          {product.oldPrice.toLocaleString()} ₽
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                        </Badge>
                      </div>
                    )}
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
                      {product.price.toLocaleString()} ₽
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      size="lg"
                      onClick={() => handleBuy(product)}
                    >
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      Купить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Не знаете, какую лампу выбрать?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Задайте вопрос нашему помощнику в чате справа внизу экрана! 
              Узнайте о доставке, характеристиках и различиях между моделями.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <Icon name="MessageCircle" size={40} className="text-orange-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Быстрые ответы</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Мгновенные ответы на популярные вопросы о товарах
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Lightbulb" size={40} className="text-pink-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Помощь в выборе</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Поможем подобрать лампу под ваши задачи
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Clock" size={40} className="text-purple-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Работаем 24/7</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Помощник доступен круглосуточно без выходных
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <Button
            size="lg"
            className="w-16 h-16 rounded-full shadow-2xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 animate-scale-in"
            onClick={() => setChatOpen(true)}
          >
            <Icon name="MessageCircle" size={28} />
          </Button>
        ) : (
          <Card className="w-[380px] h-[500px] shadow-2xl animate-slide-in-right flex flex-col">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Bot" size={24} />
                  <div>
                    <CardTitle className="text-white">Помощник</CardTitle>
                    <CardDescription className="text-white/80 text-xs">
                      Онлайн • Ответим мгновенно
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setChatOpen(false)}
                  className="hover:bg-white/20 text-white"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </CardHeader>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <CardContent className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Напишите ваш вопрос..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Спросите про доставку, оплату, характеристики
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div>
              <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Ring Light Shop
              </h3>
              <p className="text-gray-400 text-sm">
                Профессиональное освещение для создателей контента
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@ringlight.ru</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Доставка и оплата</li>
                <li>Гарантия</li>
                <li>Возврат товара</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2024 Ring Light Shop. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
