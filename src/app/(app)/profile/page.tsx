'use client'

import { useState } from 'react'
import { CreditCard, PlusCircle, Save, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'

type PaymentMethod = {
  id: string
  cardNumber: string
  expiryDate: string
  cardholderName: string
}

export default function ProfileSettingsPage() {
  const [userInfo, setUserInfo] = useState({
    companyName: 'Acme Inc.',
    phoneNumber: '+55 11 98765-4321',
    documentNumber: '12.345.678/0001-90', // CNPJ
    email: 'contact@acmeinc.com',
  })

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      cardNumber: '**** **** **** 1234',
      expiryDate: '12/24',
      cardholderName: 'John Doe',
    },
  ])

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cardholderName: '',
    cvv: '',
  })

  const [documentType, setDocumentType] = useState('cnpj')

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleSaveUserInfo = () => {
    // Here you would typically make an API call to update the user information
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been successfully updated.',
    })
  }

  const handleAddCard = () => {
    if (newCard.cardNumber && newCard.expiryDate && newCard.cardholderName) {
      const newPaymentMethod: PaymentMethod = {
        id: Date.now().toString(),
        cardNumber: `**** **** **** ${newCard.cardNumber.slice(-4)}`,
        expiryDate: newCard.expiryDate,
        cardholderName: newCard.cardholderName,
      }
      setPaymentMethods([...paymentMethods, newPaymentMethod])
      setNewCard({
        cardNumber: '',
        expiryDate: '',
        cardholderName: '',
        cvv: '',
      })
      toast({
        title: 'Card Added',
        description: 'Your new card has been successfully added.',
      })
    } else {
      toast({
        title: 'Invalid Card Details',
        description: 'Please fill in all required card information.',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteCard = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
    toast({
      title: 'Card Removed',
      description: 'The selected card has been removed from your account.',
    })
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">Profile Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Manage your account details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={userInfo.companyName}
                onChange={handleUserInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleUserInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <RadioGroup
                value={documentType}
                onValueChange={setDocumentType}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cnpj" id="cnpj" />
                  <Label htmlFor="cnpj">CNPJ</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cpf" id="cpf" />
                  <Label htmlFor="cpf">CPF</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="documentNumber">
                {documentType.toUpperCase()}
              </Label>
              <Input
                id="documentNumber"
                name="documentNumber"
                value={userInfo.documentNumber}
                onChange={handleUserInfoChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleUserInfoChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveUserInfo}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your saved payment methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <CreditCard className="h-6 w-6" />
                  <div>
                    <p className="font-medium">{method.cardNumber}</p>
                    <p className="text-sm text-gray-500">
                      {method.cardholderName} | Expires {method.expiryDate}
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteCard(method.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Card
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Card</DialogTitle>
                  <DialogDescription>
                    Enter your card details to add a new payment method.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={newCard.cardNumber}
                      onChange={(e) =>
                        setNewCard({ ...newCard, cardNumber: e.target.value })
                      }
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={newCard.expiryDate}
                        onChange={(e) =>
                          setNewCard({ ...newCard, expiryDate: e.target.value })
                        }
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={newCard.cvv}
                        onChange={(e) =>
                          setNewCard({ ...newCard, cvv: e.target.value })
                        }
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      value={newCard.cardholderName}
                      onChange={(e) =>
                        setNewCard({
                          ...newCard,
                          cardholderName: e.target.value,
                        })
                      }
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddCard}>Add Card</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
