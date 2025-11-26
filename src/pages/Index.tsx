import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: number;
  title: string;
  description: string;
  duration: number;
  price: number;
  icon: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Стрижка',
    description: 'Профессиональная стрижка от опытного мастера',
    duration: 45,
    price: 1500,
    icon: 'Scissors'
  },
  {
    id: 2,
    title: 'Окрашивание',
    description: 'Современные техники окрашивания волос',
    duration: 120,
    price: 4500,
    icon: 'Palette'
  },
  {
    id: 3,
    title: 'Укладка',
    description: 'Праздничная или повседневная укладка',
    duration: 60,
    price: 2000,
    icon: 'Sparkles'
  },
  {
    id: 4,
    title: 'Маникюр',
    description: 'Классический или аппаратный маникюр',
    duration: 90,
    price: 2500,
    icon: 'Hand'
  },
  {
    id: 5,
    title: 'Педикюр',
    description: 'Полный уход за стопами и ногтями',
    duration: 90,
    price: 2800,
    icon: 'Footprints'
  },
  {
    id: 6,
    title: 'Массаж',
    description: 'Расслабляющий массаж для всего тела',
    duration: 60,
    price: 3000,
    icon: 'Heart'
  }
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', 
  '17:00', '18:00', '19:00', '20:00'
];

type Step = 'service' | 'datetime' | 'details' | 'confirmation';

export default function Index() {
  const [step, setStep] = useState<Step>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientComment, setClientComment] = useState('');
  const { toast } = useToast();

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep('datetime');
  };

  const handleDateTimeConfirm = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: 'Ошибка',
        description: 'Выберите дату и время записи',
        variant: 'destructive'
      });
      return;
    }
    setStep('details');
  };

  const handleBookingSubmit = () => {
    if (!clientName || !clientPhone) {
      toast({
        title: 'Ошибка',
        description: 'Заполните обязательные поля',
        variant: 'destructive'
      });
      return;
    }
    setStep('confirmation');
    toast({
      title: 'Успешно!',
      description: 'Ваша запись подтверждена',
    });
  };

  const handleNewBooking = () => {
    setStep('service');
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime('');
    setClientName('');
    setClientPhone('');
    setClientComment('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Онлайн-запись
          </h1>
          <p className="text-lg text-muted-foreground">
            Забронируйте удобное время за несколько кликов
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm">
            <div className={`flex items-center gap-2 ${step === 'service' ? 'text-primary' : step !== 'service' ? 'text-muted-foreground' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'service' ? 'bg-primary text-white' : 'bg-muted'}`}>
                1
              </div>
              <span className="font-medium hidden sm:inline">Услуга</span>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
            <div className={`flex items-center gap-2 ${step === 'datetime' ? 'text-primary' : step === 'details' || step === 'confirmation' ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'datetime' ? 'bg-primary text-white' : step === 'details' || step === 'confirmation' ? 'bg-muted' : 'bg-muted/50'}`}>
                2
              </div>
              <span className="font-medium hidden sm:inline">Дата</span>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
            <div className={`flex items-center gap-2 ${step === 'details' ? 'text-primary' : step === 'confirmation' ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'details' ? 'bg-primary text-white' : step === 'confirmation' ? 'bg-muted' : 'bg-muted/50'}`}>
                3
              </div>
              <span className="font-medium hidden sm:inline">Данные</span>
            </div>
          </div>
        </div>

        {step === 'service' && (
          <div className="max-w-6xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-center">Выберите услугу</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card 
                  key={service.id}
                  className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleServiceSelect(service)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name={service.icon as any} size={24} className="text-primary" />
                      </div>
                      <Badge variant="secondary">{service.duration} мин</Badge>
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{service.price} ₽</span>
                      <Button size="sm">
                        Выбрать
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'datetime' && selectedService && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Button 
              variant="ghost" 
              onClick={() => setStep('service')}
              className="mb-4"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Выберите дату и время</CardTitle>
                <CardDescription>
                  Услуга: {selectedService.title} • {selectedService.duration} мин • {selectedService.price} ₽
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base mb-4 block">Выберите дату</Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>
                </div>

                {selectedDate && (
                  <div className="animate-fade-in">
                    <Label className="text-base mb-4 block">Выберите время</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? 'default' : 'outline'}
                          onClick={() => setSelectedTime(time)}
                          className="w-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <Button 
                    onClick={handleDateTimeConfirm} 
                    className="w-full animate-fade-in"
                    size="lg"
                  >
                    Продолжить
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'details' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Button 
              variant="ghost" 
              onClick={() => setStep('datetime')}
              className="mb-4"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Ваши контактные данные</CardTitle>
                <CardDescription>
                  Мы свяжемся с вами для подтверждения записи
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя *</Label>
                  <Input 
                    id="name"
                    placeholder="Введите ваше имя"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий</Label>
                  <Textarea 
                    id="comment"
                    placeholder="Дополнительные пожелания..."
                    value={clientComment}
                    onChange={(e) => setClientComment(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={handleBookingSubmit} 
                  className="w-full"
                  size="lg"
                >
                  Подтвердить запись
                  <Icon name="Check" size={20} className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'confirmation' && selectedService && selectedDate && (
          <div className="max-w-2xl mx-auto animate-scale-in">
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={40} className="text-primary" />
                </div>
                <CardTitle className="text-3xl">Запись подтверждена!</CardTitle>
                <CardDescription className="text-base mt-2">
                  Мы отправили подтверждение на ваш номер телефона
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name={selectedService.icon as any} size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">{selectedService.title}</p>
                      <p className="text-sm text-muted-foreground">{selectedService.duration} минут</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="Calendar" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">
                        {selectedDate.toLocaleDateString('ru-RU', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">в {selectedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="User" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">{clientName}</p>
                      <p className="text-sm text-muted-foreground">{clientPhone}</p>
                    </div>
                  </div>

                  {clientComment && (
                    <div className="flex items-start gap-3">
                      <Icon name="MessageSquare" size={20} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium">Комментарий</p>
                        <p className="text-sm text-muted-foreground">{clientComment}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Итого к оплате:</span>
                      <span className="text-2xl font-bold text-primary">{selectedService.price} ₽</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleNewBooking}
                    variant="outline"
                    className="flex-1"
                  >
                    <Icon name="Plus" size={20} className="mr-2" />
                    Новая запись
                  </Button>
                  <Button 
                    className="flex-1"
                  >
                    <Icon name="Download" size={20} className="mr-2" />
                    Сохранить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
