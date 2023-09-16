export class DateFormatter{
    public toString(dateInput: Date): string{
        const month: number = dateInput.getMonth() + 1;
        const date: number = dateInput.getDate();
        return dateInput.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (date < 10 ? '0' : '') + date;
    }

    public toAria(dateInput: Date): string{
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                           ];
        const month: string = monthNames[dateInput.getMonth()];
        const date: number = dateInput.getDate();
        return month + ' ' + date + ', ' + dateInput.getFullYear();
    }
}