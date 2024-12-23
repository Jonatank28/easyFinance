import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Props {
  open: boolean
  title: string
  onClose: () => void
  children?: React.ReactNode
  footer: React.JSX.Element
  description?: string
}


const DefaultModal = ({ open, title, onClose, children, footer, description }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose} modal>
      <DialogContent className="max-h-[90vh] flex flex-col px-2 md:px-6">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto px-2 pb-2">
          {children}
        </div>
        <DialogFooter>
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DefaultModal