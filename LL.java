public class LL{
    static node head;
    static class node{
        int val;
        node next;
        node(int d){
        val=d;
        next=null;
        }
    }
    public static void insertTail(int d){
        node n=new node(d);
        if(head==null){
            head=n;
            return;
        }
        node tail=head;
        while(tail.next!=null){
            tail=tail.next;
        }
        tail.next=n;
    }
    public static void insertHead(int d){
        node n=new node(d);
        if(head==null){
            head=n;
            return ;
        }
        n.next=head;
        head=n;
    }
    public static void removeHead(){
        if(head==null){
            System.out.println("khali hai");
            return ;
        }
        node temp=head;
        head=head.next;
        temp.next=null;
    }
    public static void removeTail(){
        if(head==null){
            System.out.println("Khali hai");
            return ;
        }
        if(head.next==null){
            head=null;
            return;
        }
        node temp=head;
        while(temp.next.next!=null){
            temp=temp.next;
        }
        temp.next=null;
    }
    public static void print(){
        node temp=head;
        while(temp!=null){
            System.out.print(temp.val+"->");
            temp=temp.next;
        }
        System.out.println("null");
    }
    public static void main(String args[]){
        LL list =new LL();
        insertHead(1);
        insertTail(2);
        insertHead(3);
        insertTail(4);
        print();
    }
    
}