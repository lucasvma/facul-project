class PaymentStatusEnum {
    static PENDING = new PaymentStatusEnum("PENDING");
    static APPROVED = new PaymentStatusEnum("APPROVED");
    static CANCELED = new PaymentStatusEnum("CANCELED");

    constructor(name) {
        this.name = name
    }
}